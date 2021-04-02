export declare let errors: import("maishu-toolkit").Errors & {
    notSupportedDatabaseType(dbType: string): Error;
    objectNotExists(typeName: string, id: string): Error;
};
