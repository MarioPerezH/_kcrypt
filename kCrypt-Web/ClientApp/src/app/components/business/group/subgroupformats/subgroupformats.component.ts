import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session-service.service';
import { SubGroupFormatFDto, FieldFDto } from 'src/app/services/Common/ObjectFDtos';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SubgroupformatsModalComponent } from '../subgroupformats-modal/subgroupformats-modal.component';
import { UtilsService } from 'src/app/services/Common/utils.service';

@Component({
    selector: 'app-subgroupformats',
    templateUrl: './subgroupformats.component.html',
    styleUrls: ['./subgroupformats.component.css']
})
export class SubgroupformatsComponent implements OnInit {

    public model: IModel;

    constructor(private sessionService: SessionService,
        private notification: NotificationService,
        private modalService: ModalService,
        private utilService: UtilsService) {

        this.model = <IModel>{};
        this.model.subgroupFormats = this.sessionService.getSession().SubGroupFormats;
        this.model.subgroupFormatSelected = this.model.subgroupFormats[0] || <SubGroupFormatFDto>{};
    }

    ngOnInit() {
    }

    public openSubGroupFormatModal(subGroupFormat: SubGroupFormatFDto) {
        this.modalService.open(SubgroupformatsModalComponent, (instance) => {
            instance.setParameters(subGroupFormat, () => {
                this.loadInformation(subGroupFormat);
                this.modalService.close();
            })
        });
    }

    public loadInformation(subGroupFormat: SubGroupFormatFDto) {
        let session = this.sessionService.getSession();
        this.model.subgroupFormats = session.SubGroupFormats;

        if (!subGroupFormat || !subGroupFormat.Id) {
            this.model.subgroupFormatSelected = this.model.subgroupFormats.slice(-1)[0] || <SubGroupFormatFDto>{};
        } else {
            this.model.subgroupFormatSelected = this.model.subgroupFormats.filter(s => s.Id === subGroupFormat.Id)[0];
        }
    }

    public subgroupFormatSelect(subgroupFormat: SubGroupFormatFDto) {
        this.model.subgroupFormatSelected = subgroupFormat;
    }

    public deleteField(subgroupFormat: SubGroupFormatFDto, field: FieldFDto) {
        let callback = () => {
            let index = subgroupFormat.Fields.findIndex(s => s.Id === field.Id);
            subgroupFormat.Fields.splice(index, 1);

            this.updateSubGroupFormat(subgroupFormat);
        }

        this.notification
            .Alert('Eliminación de formato', '¿Esta seguro que desea eliminar este formato? Esta información se perderá permanentemente y los subgrupos asociados a este registro se marcarán con formato "Desconocido".', 'Sí, eliminar formato')
            .then(value => value ? callback() : null);
    }

    public editField(field: FieldFDto) {
        field.IsNewField = true;
    }

    public newField() {
        if (!this.model.subgroupFormatSelected.Fields)
            this.model.subgroupFormatSelected.Fields = [];

        this.model.subgroupFormatSelected.Fields.push({
            IsNewField: true,
            IsEncrypted: false,
            IsPassword: false
        });
    }

    public existNewField(){
        return (this.model.subgroupFormatSelected.Fields || []).filter(f=> f.IsNewField).length > 0;
    }

    public saveField(subgroupFormat: SubGroupFormatFDto, field: FieldFDto) {
        field.IsNewField = false;

        if (!field.Id) {
            field.Id = this.utilService.generateGuid();
        }

        this.updateSubGroupFormat(subgroupFormat);
    }

    public updateSubGroupFormat(subgroupFormat: SubGroupFormatFDto) {
        let session = this.sessionService.getSession();

        if (!subgroupFormat.Id) {
            session.SubGroupFormats.push(subgroupFormat);
        } else {
            let index = session.SubGroupFormats.findIndex(s => s.Id === subgroupFormat.Id);
            session.SubGroupFormats[index] = subgroupFormat;
        }

        this.sessionService.setSession(session);
    }

    public updateSubGroupFormats(subgroupFormats: SubGroupFormatFDto[]) {
        let session = this.sessionService.getSession();
        session.SubGroupFormats = subgroupFormats;
        this.sessionService.setSession(session);
    }

    public deleteSubGroupFormat(subgroupFormat: SubGroupFormatFDto) {
        let callback = () => {
            let index = this.model.subgroupFormats.findIndex(s => s.Id === subgroupFormat.Id);

            this.model.subgroupFormats.splice(index, 1);
            this.updateSubGroupFormats(this.model.subgroupFormats);
            this.loadInformation(this.model.subgroupFormats[index -1]);
        }

        this.notification
            .Alert('Eliminación de formato', '¿Esta seguro que desea eliminar el formato?. Todos los datos asociados a este formato se eliminarán permanentemente', 'Sí, eliminar formato.')
            .then(value => value ? callback() : null);
    }

    public cancelSaveField(){
        let index = this.model.subgroupFormatSelected.Fields.findIndex(f=> f.IsNewField);
        this.model.subgroupFormatSelected.Fields.splice(index, 1);

        this.updateSubGroupFormat(this.model.subgroupFormatSelected);
    }
}

interface IModel {
    subgroupFormatSelected: SubGroupFormatFDto;
    subgroupFormats: SubGroupFormatFDto[];

}