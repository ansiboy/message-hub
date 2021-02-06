import { errors as baseErrors } from "maishu-toolkit";

export let errors = Object.assign(baseErrors, {
    notSupportedDatabaseType(dbType: string) {
        let msg = `Database type '${dbType}' is not supported.`;
        let error = new Error(msg);
        let name = "notSupportedDatabaseType";
        error.name = name;
        return error;
    }
});