import { ReportFDto } from '../proxy/proxy.service';

export class _kCrypt {
    Profiles: ProfileFDto[];
    ConfigurationsEncrypted: ConfigurationsEncryptedFDto[];
    LastProfleConnect: number | string;
}

export class ConfigurationsEncryptedFDto {
    IdProfile: number | string;
    ConfigurationsEncrypted: string | any;
}

export class RegisterProfileFDto {
    Email: string;
    Password: string;
    RepeatPassword: string;
    PrivateKeyPassword: string;
}

export class ProfileFDto {
    Id: number | string;
    Email: string;
    PasswordEncrypted: string;
}

export class ConfigurationFDto {
    Id: number | string;
    TypeGroups: TypeGroupFDto[];
    Groups: GroupFDto[];
    SubGroups: SubGroupFDto[];
    SubGroupFormats: SubGroupFormatFDto[];
    IdProfile: number | string;
    GetPathPrivateKeyEncrypt?: string;
    ActiveSessionDurationSeconds: number;
}

export class SessionDTO extends ConfigurationFDto {
    token: string;
    email: string;
    id: number;
    name: string;
    roles: string[];
    sonido: boolean;
    listaPantallas: any;
    urllogo: string;
    reportes: ReportFDto[];
}

export class GroupFDto {
    Id: number | string;
    Name: string;
}

export class SubGroupFDto {
    Id: number | string;
    Name: string;
    IdGroup: number | string;
    IdSubGroupFormat: number;
    Fields: FieldFDto[];
}

export class FieldFDto {
    Id?: number | string;
    Name?: string;
    Value?: string;
    Encrypted?: string | any;
    IsEncrypted?: boolean;
    IsPassword?: boolean;
    TextHelp?: string;
    IsNewField?: boolean;
}

export class SubGroupFormatFDto {
    Id: number | string;
    Name: string;
    Fields: FieldFDto[];
}

export class TypeGroupFDto {
    Id: number;
    Name: string;
}