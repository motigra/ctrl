type Sub = {
    name: string;
    args?: Record<string, any>;
}

type DTO = Record<string, Sub[]>;

export { Sub, DTO };
