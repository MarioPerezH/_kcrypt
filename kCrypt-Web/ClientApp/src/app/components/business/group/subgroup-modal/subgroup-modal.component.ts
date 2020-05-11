import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SessionService } from 'src/app/services/session/session-service.service';
import { GroupFDto, SubGroupFDto, TypeGroupFDto, SubGroupFormatFDto, FieldFDto } from 'src/app/services/Common/ObjectFDtos';
import { CipherService } from 'src/app/services/cipher/cipher.service';
import { UtilsService } from 'src/app/services/Common/utils.service';

@Component({
    selector: 'app-subgroup-modal',
    templateUrl: './subgroup-modal.component.html',
    styleUrls: ['./subgroup-modal.component.css']
})
export class SubgroupModalComponent implements OnInit {
    public model: IModel;

    constructor(private modalService: ModalService,
        private sessionService: SessionService,
        private cipherService: CipherService,
        private utilService: UtilsService) {

        let session = this.sessionService.getSession();
        this.model = <any>{ fields: [] };
        this.model.subgroupFormats = session.SubGroupFormats;
    }

    ngOnInit() {
    }

    public onChange(x) {
        this.getSubGroupFormat(x);
    }

    public setParameters(group: GroupFDto, subgroup: SubGroupFDto, callbackFinish: Function) {
        if (!subgroup) subgroup = <any>{ Fields: [] };

        this.model.group = group;
        this.model.subgroup = Object.assign({}, subgroup);
        this.model.subgroup
            .Fields
            .filter(s => s.IsEncrypted)
            .forEach(s => s.Value = this.cipherService.decrypt(s.Encrypted));

        this.model.idSubgroupFormatSelected = subgroup.IdSubGroupFormat;
        this.getSubGroupFormat(subgroup.IdSubGroupFormat);
        this.model.callbackFinish = callbackFinish;
    }

    public getSubGroupFormat(idSubgroupFormatSelected: number) {
        if (!idSubgroupFormatSelected) return <any>{ Fields: [] };

        let subgroupFormat = this.model.subgroupFormats.find(g => g.Id === idSubgroupFormatSelected);
        let fields = <FieldViewPasswordFDto[]>Object.assign([], subgroupFormat.Fields);

        fields.forEach(f => {
            let field = this.model.subgroup.Fields.find(f2 => f2.Name === f.Name);
            if (!!field) {
                f.Encrypted = field.Encrypted;
                f.Value = field.Value;
                f.IsPassword = field.IsPassword;
                f.IsEncrypted = field.IsEncrypted;
            }
        })

        this.model.fields = fields;
    }

    public viewValueDecrypt(field: FieldViewPasswordFDto) {
        field.IsViewPassword = true;
        field.Value = this.cipherService.decrypt(field.Encrypted);
    }

    public save() {
        if (!this.model.idSubgroupFormatSelected || !this.model.subgroup.Name) return;

        let session = this.sessionService.getSession();

        this.model.subgroup.IdSubGroupFormat = this.model.idSubgroupFormatSelected;
        this.model.subgroup.Fields = this.model.subgroupFormats.find(f => f.Id === this.model.idSubgroupFormatSelected).Fields;
        this.model.subgroup.Fields
            .map(s => {
                (<FieldViewPasswordFDto>s).IsViewPassword = null;
                return s;
            })
            .filter(s => s.IsEncrypted)
            .forEach(s => {
                s.Encrypted = this.cipherService.encrypt(s.Value);
                s.Value = null;
            });

        if (!this.model.subgroup.Id) {
            this.model.subgroup.Id = this.utilService.generateGuid();
            this.model.subgroup.IdGroup = this.model.group.Id;
            session.SubGroups.push(this.model.subgroup);
        } else {
            let index = session.SubGroups.findIndex(s => s.Id === this.model.subgroup.Id);
            session.SubGroups[index] = this.model.subgroup;
        }

        this.sessionService.setSession(session);
        this.model.callbackFinish();
    }

    public haveFields() {
        if (!this.model.idSubgroupFormatSelected || !this.model.subgroup.Name) return false;

        if (!(this.model.subgroupFormats.find(f => f.Id === this.model.idSubgroupFormatSelected).Fields || []).length)
            return false;

        return true;
    }
}

interface IModel {
    group: GroupFDto;
    subgroup: SubGroupFDto;
    idSubgroupFormatSelected: number;
    subgroupFormats: SubGroupFormatFDto[];
    callbackFinish: Function;
    fields: FieldViewPasswordFDto[];
}


interface FieldViewPasswordFDto extends FieldFDto {
    IsViewPassword: boolean;
}