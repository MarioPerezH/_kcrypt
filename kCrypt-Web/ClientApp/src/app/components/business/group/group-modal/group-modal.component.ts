import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SessionService } from 'src/app/services/session/session-service.service';
import { GroupFDto } from 'src/app/services/Common/ObjectFDtos';
import { UtilsService } from 'src/app/services/Common/utils.service';

@Component({
    selector: 'app-group-modal',
    templateUrl: './group-modal.component.html',
    styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {
    public model: IModel;

    constructor(private modalService: ModalService,
        private sessionService: SessionService,
        private utilService: UtilsService) {
        this.model = <any>{};
    }

    ngOnInit() {
    }

    public setParameters(group: GroupFDto, callbackFinish: Function) {
        if (!group) group = <GroupFDto>{};

        this.model.group = Object.assign({}, group);
        this.model.callbackFinish = callbackFinish;
    }

    public save() {
        let session = this.sessionService.getSession();

        if (!this.model.group.Id) {
            this.model.group.Id = this.utilService.generateGuid();
            session.Groups.push(this.model.group);
        } else {
            let index = session.Groups.findIndex(g => g.Id === this.model.group.Id);
            session.Groups[index] = this.model.group;
        }

        this.sessionService.setSession(session);
        this.model.callbackFinish();
    }

    public isFormValid(){
        return !this.model.group.Name;
    }
}

interface IModel {
    group: GroupFDto;
    callbackFinish: Function;
}
