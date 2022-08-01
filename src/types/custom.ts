export type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;
export type ArgsPromiseType<T extends (arg: any) => Promise<any>> = T extends (arg: infer R) => Promise<any> ? R : any;