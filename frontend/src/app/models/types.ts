export interface Contact {
    id: number;
    createdAt: Date;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'completed' | 'not completed';
}

export interface Quote {
    id: number;
    createdAt: Date;
    name: string;
    email: string;
    phone: string;
    floorType: string;
    roomType: string;
    squareFeet: number;
    timeline: string;
    status: 'completed' | 'not completed';
}