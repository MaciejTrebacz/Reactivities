export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
}

export interface people {
    age: number;
    name: string;
}