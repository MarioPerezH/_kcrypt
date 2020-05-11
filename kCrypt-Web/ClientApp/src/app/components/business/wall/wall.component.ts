import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { GroupModalComponent } from '../group/group-modal/group-modal.component';
import { SessionService } from 'src/app/services/session/session-service.service';
import { ConfigurationFDto, GroupFDto, SubGroupFDto, TypeGroupFDto, FieldFDto, SubGroupFormatFDto } from 'src/app/services/Common/ObjectFDtos';
import { SubgroupModalComponent } from '../group/subgroup-modal/subgroup-modal.component';
import { CipherService } from 'src/app/services/cipher/cipher.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UtilsService } from 'src/app/services/Common/utils.service';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

    public model: IModel;

    constructor(private modalService: ModalService,
        private sessionService: SessionService,
        private cipherService: CipherService,
        private notification: NotificationService,
        private utilService: UtilsService) {

    }

    ngOnInit() {
        let session = this.sessionService.getSession() || <any>{};

        this.model = <IModel>{
            groups: session.Groups || [],
            subgroupFormats: session.SubGroupFormats || [],
            groupSelected: (session.Groups || [])[0] || <GroupFDto>{},
            subgroups: session.SubGroups || []
        };
    }

    public openGroupModal(group: GroupFDto) {
        this.modalService.open(GroupModalComponent, (instance) => {
            instance.setParameters(group, () => {
                this.loadInformationGroup(group);
                this.modalService.close();
            });
        });
    }

    public openSubGroupModal(group: GroupFDto, subgroup: SubGroupFDto) {
        this.modalService.open(SubgroupModalComponent, (instance) => {
            instance.setParameters(group, subgroup, () => {
                this.loadInformationGroup(group);
                this.modalService.close();
            });
        });
    }

    public loadInformationGroup(group: GroupFDto) {
        let session = this.sessionService.getSession();
        this.model.groups = session.Groups;
        this.model.subgroups = session.SubGroups;

        if (!this.model.groups.length) {
            this.model.groupSelected = <GroupFDto>{ Name: '' };
            return;
        }

        if (!group || !group.Id) {
            this.model.groupSelected = session.Groups.slice(-1)[0];
        } else {
            this.model.groupSelected = session.Groups.find(g => g.Id === group.Id);
        }
    }

    public groupSelect(group: GroupFDto) {
        this.model.groupSelected = group;
    }

    public getSubGroups(idGroup: number | string) {
        return this.model.subgroups.filter(s => s.IdGroup === idGroup);
    }

    public getSubGroupFormat(idSubgroupFormat: number) {
        return this.model.subgroupFormats.filter(t => t.Id === idSubgroupFormat)[0] || <SubGroupFormatFDto>{ Name: 'Desconocido' };
    }

    public copyField(field: FieldFDto) {
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);

        let value: string = null;
        if (field.IsEncrypted) {
            value = this.cipherService.decrypt(field.Encrypted);
        }
        else
            value = field.Value;

        dummy.value = value;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    public deleteGroup(group: GroupFDto) {
        let callback = () => {
            let index = this.model.groups.findIndex(g => g.Id === group.Id);
            this.model.groups.splice(index, 1);

            this.updateGroups(this.model.groups);
            this.loadInformationGroup(null);
        }

        this.notification
            .Alert('Eliminación de SubGrupo', '¿Esta seguro que desea eliminar este grupo?. Esta información se perderá permanentemente en conjunto de todos sus subgrupos existentes.', 'Sí, eliminar grupo.')
            .then(value => value ? callback() : null);
    }

    public deleteSubGroup(subgroup: SubGroupFDto) {
        let callback = () => {
            let index = this.model.subgroups.findIndex(s => s.Id === subgroup.Id);
            this.model.subgroups.splice(index, 1);
            this.updateSubGroups(this.model.subgroups);
        }

        this.notification
            .Alert('Eliminación de SubGrupo', '¿Esta seguro que desea eliminar este subgrupo?. Esta información se perderá permanentemente.', 'Sí, eliminar subgrupo.')
            .then(value => value ? callback() : null);
    }

    public updateGroups(groups: GroupFDto[]) {
        let session = this.sessionService.getSession()

        session.Groups = groups;
        this.sessionService.setSession(session);
    }

    public updateSubGroups(subgroups: SubGroupFDto[]) {
        let session = this.sessionService.getSession()

        session.SubGroups = subgroups;
        this.sessionService.setSession(session);
    }

    public onKeydown(event) {
        if (event.key === "Enter") {
            console.log(event);
        }
    }

    public IsFind(subgroup: SubGroupFDto) {
        if (!this.model.textFindSubGroup) return true;

        let textFind = this.model.textFindSubGroup.toLowerCase(),
            textFormat = this.model.subgroupFormats.filter(f => f.Id === subgroup.IdSubGroupFormat)[0].Name;

        return textFormat.toLowerCase().indexOf(textFind) > -1 ||
            subgroup.Name.toLowerCase().indexOf(textFind) > -1 ||
            subgroup.Fields.filter(f => (f.Value || '').toLowerCase().indexOf(textFind) > -1).length > 0;
    }

    public truncateValue(value: string){
        let length = 70;
        return value.substr(0, length) + (value.length > length ? '...' : '');
    }
}

interface IModel {
    groups: GroupFDto[];
    groupSelected: GroupFDto;
    subgroups: SubGroupFDto[];
    subgroupFormats: SubGroupFormatFDto[];
    textFindSubGroup: string;
}