/* eslint-disable @typescript-eslint/no-explicit-any */
export type Params<T = any> = {
    [key: string | number | symbol]: T;
};