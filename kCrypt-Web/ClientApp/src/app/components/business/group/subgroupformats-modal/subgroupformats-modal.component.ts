import { Component, OnInit } from '@angular/core';
import { SubGroupFormatFDto } from 'src/app/services/Common/ObjectFDtos';
import { SessionService } from 'src/app/services/session/session-service.service';
import { UtilsService } from 'src/app/services/Common/utils.service';

@Component({
    selector: 'app-subgroupformats-modal',
    templateUrl: './subgroupformats-modal.component.html',
    styleUrls: ['./subgroupformats-modal.component.css']
})
export class SubgroupformatsModalComponent implements OnInit {
    public model: IModel;
    constructor(private sessionService: SessionService,
        private utilService: UtilsService) {
        this.model = <IModel>{};

    }

    ngOnInit() {
    }

    public setParameters(subgroupFormat: SubGroupFormatFDto, callbackFinish: Function) {
        if (!subgroupFormat) subgroupFormat = <SubGroupFormatFDto>{};

        this.model.subgroupFormat = Object.assign({}, subgroupFormat);
        this.model.callbackFinish = callbackFinish;
    }

    public save() {
        let session = this.sessionService.getSession();

        if (!this.model.subgroupFormat.Id) {
            this.model.subgroupFormat.Id = this.utilService.generateGuid();
            session.SubGroupFormats.push(this.model.subgroupFormat);
        } else {
            let index = session.SubGroupFormats.findIndex(s => s.Id === this.model.subgroupFormat.Id);
            session.SubGroupFormats[index] = this.model.subgroupFormat;
        }

        this.sessionService.setSession(session);
        this.model.callbackFinish();
    }
}

interface IModel {
    subgroupFormat: SubGroupFormatFDto;
    callbackFinish: Function;
}
