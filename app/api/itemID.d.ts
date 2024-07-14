export interface ItemID {
    result: boolean;
    item: RawItem;
}

export interface RawItem {
    id: string;
    type: Rarity;
    name: string;
    description: string;
    rarity: Rarity;
    series?: Rarity | null;
    price: number;
    added: Added;
    builtInEmote?: null;
    copyrightedAudio?: boolean;
    upcoming?: boolean;
    reactive?: boolean;
    releaseDate?: Date;
    lastAppearance: Date;
    interest?: number;
    images: Images;
    juno?: Juno;
    video?: null;
    audio?: null;
    path?: string;
    gameplayTags?: string[];
    apiTags?: any[];
    searchTags?: any[];
    set: Set;
    introduction?: Introduction;
    displayAssets: DisplayAsset[];
    shopHistory: Date[];
    styles?: Style[];
    previewVideos?: any[];
    grants: Grant[];
    grantedBy: any[];
    bg: string
    battlepass?: {
        season: number,
        tier: number,
        page: number,
        type: string,
        displayText: {
            chapter: string,
            season: string,
            chapterSeason: string
        },
        battlePassName: string
    }
}

export interface Price {
    regularPrice: number,
    finalPrice: number,
    floorPrice: number
}

//Se extiende la interface Original omitiendo price y creando un nuevo price que coincida con la data formateada del fetch
export interface Item extends Omit<RawItem, 'price'> {
    price: Price; // Price is transformed to an object
}

export interface Added {
    date: Date;
    version: string;
}

export interface DisplayAsset {
    displayAsset: string;
    materialInstance: string;
    primaryMode: string;
    url: string;
    flipbook: null;
    background_texture: null;
    background: string;
    full_background: string;
}

export interface Grant {
    id: string;
    type: Rarity;
    name: string;
    description: string;
    rarity: Rarity;
    series: Rarity;
    images: Images;
}

export interface Images {
    icon: string;
    featured: null | string;
    background: string;
    icon_background: string;
    full_background: string;
}

export interface Rarity {
    id: string;
    name: string;
}

export interface Introduction {
    chapter: string;
    season: string;
    text: string;
}

export interface Juno {
    icon: null;
}

export interface Set {
    id: string;
    name: string;
    partOf: string;
}

export interface Style {
    name: string;
    channel: string;
    channelName: string;
    tag: string;
    isDefault: boolean;
    startUnlocked: boolean;
    hideIfNotOwned: boolean;
    image: null | string;
}
