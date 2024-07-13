export interface Rarities {
    rarities: Rarity[];
    series: Rarity[];
    name?: string,
    id?: string
}

export interface RarityType {
    id: string;
    name: string;
    translationID?: string;
    colors?: {
        [key: string]: string
    };
    image: string;
}

export interface Colors {
    [key: string]: string
}
