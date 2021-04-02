import { errors as baseErrors } from "maishu-toolkit";

export let errors = Object.assign(baseErrors, {
    notSupportedDatabaseType(dbType: string) {
        let msg = `Database type '${dbType}' is not supported.`;
        let error = new Error(msg);
        let name = "notSupportedDatabaseType";
        error.name = name;
        return error;
    },
    objectNotExists(typeName: string, id: string) {
        let msg = `Data '${typeName}' is not exists with id '${id}'`;
        let error = new Error(msg);
        error.name = errors.objectNotExists.name;
        return error;
    }
});