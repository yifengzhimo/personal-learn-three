interface Point {
    X: number;
    Y: number;
}

interface TextEntity {
    X: number;
    Y: number;
    InsertText: string;
}

interface Profile {
    Name: string;
    Levels: number;
    Height: number;
    Points: Point[];
    TxtEntity: TextEntity;
}

interface Border {
    LayerName: string;
    Points: Point[];
}

interface Basement {
    LayerName: string;
    Points: Point[];
}

interface DXFEntity {
    ErrorCode: string;
    ErrorMsg: string;
    fileName?: string;
    Profiles?: Profile[];
    Borders?: Border[];
    Basements?: Basement[];
    CenterPoint?: Point;
}

export {
    Point,
    TextEntity,
    Profile,
    Basement,
    Border,
    DXFEntity
}