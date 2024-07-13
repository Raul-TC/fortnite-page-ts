export interface Cosmetics {
    result: boolean;
    pages: number;
    items: Item[];
}

export interface Item {
    id: string;
    type: Rarity;
    name: string;
    description: string;
    rarity: Rarity;
    series: Rarity | null;
    price: number;
    added: Added;
    builtInEmote: BuiltInEmote | null;
    copyrightedAudio: boolean;
    upcoming: boolean;
    reactive: boolean;
    releaseDate: Date | null;
    lastAppearance: Date | null;
    interest: number;
    images: Images;
    juno: Juno;
    video: null | string;
    audio: null | string;
    path: null | string;
    gameplayTags: string[];
    apiTags: string[];
    battlepass: Battlepass | null;
    set: Set | null;
}

export interface Added {
    date: Date;
    version: string;
}

export interface Battlepass {
    season: number;
    tier: number;
    page: number | null;
    type: Type;
    displayText: DisplayText;
    battlePassName: BattlePassName;
}

export enum BattlePassName {
    PaseDeBatalla = "Pase de batalla",
}

export interface DisplayText {
    chapter: Chapter;
    season: Season;
    chapterSeason: ChapterSeason;
}

export enum Chapter {
    Capítulo1 = "Capítulo 1",
    Capítulo2 = "Capítulo 2",
    Capítulo3 = "Capítulo 3",
    Capítulo4 = "Capítulo 4",
    Capítulo5 = "Capítulo 5",
    Empty = "",
}

export enum ChapterSeason {
    Capítulo1Temporada2 = "Capítulo 1 - Temporada 2",
    Capítulo1Temporada3 = "Capítulo 1 - Temporada 3",
    Capítulo1Temporada4 = "Capítulo 1 - Temporada 4",
    Capítulo1Temporada5 = "Capítulo 1 - Temporada 5",
    Capítulo1Temporada6 = "Capítulo 1 - Temporada 6",
    Capítulo1Temporada7 = "Capítulo 1 - Temporada 7",
    Capítulo1Temporada8 = "Capítulo 1 - Temporada 8",
    Capítulo1Temporada9 = "Capítulo 1 - Temporada 9",
    Capítulo1TemporadaX = "Capítulo 1 - Temporada X",
    Capítulo2Temporada1 = "Capítulo 2 - Temporada 1",
    Capítulo2Temporada2 = "Capítulo 2 - Temporada 2",
    Capítulo2Temporada3 = "Capítulo 2 - Temporada 3",
    Capítulo2Temporada4 = "Capítulo 2 - Temporada 4",
    Capítulo2Temporada5 = "Capítulo 2 - Temporada 5",
    Capítulo2Temporada6 = "Capítulo 2 - Temporada 6",
    Capítulo2Temporada7 = "Capítulo 2 - Temporada 7",
    Capítulo2Temporada8 = "Capítulo 2 - Temporada 8",
    Capítulo3Temporada1 = "Capítulo 3 - Temporada 1",
    Capítulo3Temporada2 = "Capítulo 3 - Temporada 2",
    Capítulo3Temporada3 = "Capítulo 3 - Temporada 3",
    Capítulo3Temporada4 = "Capítulo 3 - Temporada 4",
    Capítulo4Temporada1 = "Capítulo 4 - Temporada 1",
    Capítulo4Temporada2 = "Capítulo 4 - Temporada 2",
    Capítulo4Temporada3 = "Capítulo 4 - Temporada 3",
    Capítulo4Temporada4 = "Capítulo 4 - Temporada 4",
    Capítulo5Temporada1 = "Capítulo 5 - Temporada 1",
    Capítulo5Temporada2 = "Capítulo 5 - Temporada 2",
    Capítulo5Temporada3 = "Capítulo 5 - Temporada 3",
    FortniteOrígenes = "Fortnite: Orígenes",
}

export interface FormattedItem {
    id: string;
    type: Rarity;
    name: string;
    rarity: Rarity | null;
    series: Rarity | null;
    images: Images;
    price: number;
    bg?: string;
    bgDefault?: string;
}
export interface Rarities {
    rarities: Rarity[];
    series: Rarity[];
}

export interface TypesCosmetics {
    // type: 'rareza' | 'series' | 'tipos';
    // values: Rarity[];
    rareza: Rarity[];
    series: Rarity[];
    tipos: Rarity[];
}

export enum Season {
    FortniteOrígenes = "Fortnite: Orígenes",
    Temporada1 = "Temporada 1",
    Temporada2 = "Temporada 2",
    Temporada3 = "Temporada 3",
    Temporada4 = "Temporada 4",
    Temporada5 = "Temporada 5",
    Temporada6 = "Temporada 6",
    Temporada7 = "Temporada 7",
    Temporada8 = "Temporada 8",
    Temporada9 = "Temporada 9",
    TemporadaX = "Temporada X",
}

export interface RarityItem {
    id: string;
    name: string;
    image?: string;  // Asumiendo que image es opcional
    colors?: {
        [key: string]: string
    }
}

export enum Type {
    Free = "free",
    Paid = "paid",
}

export interface BuiltInEmote {
    id: string;
    type: Rarity;
    name: string;
    description: string;
    rarity: Rarity;
    series: Rarity | null;
    images: Images;
    video: null;
}

export interface Images {
    icon: undefined | string;
    featured: null | string;
    background: null | string;
    icon_background: null | string;
    full_background: null | string;
}


export enum ID {
    Backpack = "backpack",
    Bannertoken = "bannertoken",
    Battlebus = "battlebus",
    BuildingProp = "building_prop",
    BuildingSet = "building_set",
    Bundle = "bundle",
    CUBESeries = "CUBESeries",
    ColumbusSeries = "ColumbusSeries",
    Common = "Common",
    Contrail = "contrail",
    Cosmeticvariant = "cosmeticvariant",
    CreatorCollabSeries = "CreatorCollabSeries",
    DCUSeries = "DCUSeries",
    Emoji = "emoji",
    Emote = "emote",
    Epic = "Epic",
    FrozenSeries = "FrozenSeries",
    Glider = "glider",
    Itemaccess = "itemaccess",
    LavaSeries = "LavaSeries",
    Legendary = "Legendary",
    Loadingscreen = "loadingscreen",
    MarvelSeries = "MarvelSeries",
    Music = "music",
    Outfit = "outfit",
    Pet = "pet",
    Pickaxe = "pickaxe",
    PlatformSeries = "PlatformSeries",
    Rare = "Rare",
    SeriesLamborghini = "Series_Lamborghini",
    SeriesMcLaren = "Series_McLaren",
    ShadowSeries = "ShadowSeries",
    SlurpSeries = "SlurpSeries",
    SparksAura = "sparks_aura",
    SparksBass = "sparks_bass",
    SparksDrum = "sparks_drum",
    SparksGuitar = "sparks_guitar",
    SparksKeyboard = "sparks_keyboard",
    SparksMicrophone = "sparks_microphone",
    SparksSong = "sparks_song",
    Spray = "spray",
    Toy = "toy",
    Transcendent = "Transcendent",
    Unattainable = "unattainable",
    Uncommon = "Uncommon",
    VehicleBody = "vehicle_body",
    VehicleBooster = "vehicle_booster",
    VehicleCosmeticvariant = "vehicle_cosmeticvariant",
    VehicleDrifttrail = "vehicle_drifttrail",
    VehicleSkin = "vehicle_skin",
    VehicleWheel = "vehicle_wheel",
    Wrap = "wrap",
}

export enum Name {
    AccesorioMochilero = "Accesorio mochilero",
    AlaDelta = "Ala delta",
    AuraChispa = "Aura chispa",
    AutobúsDeBatalla = "Autobús de batalla.",
    Bajo = "Bajo",
    Batería = "Batería",
    Calcomanía = "Calcomanía",
    Común = "COMÚN",
    Decoración = "Decoración",
    Emoticono = "Emoticono",
    Empty = "",
    Envoltorio = "Envoltorio",
    Estandarte = "ESTANDARTE",
    Estela = "Estela",
    Estilo = "Estilo",
    Exótico = "Exótico",
    Gesto = "Gesto",
    Grafiti = "Grafiti",
    Guitarra = "Guitarra",
    Itemaccess = "itemaccess",
    Juguete = "Juguete",
    Keytar = "Keytar",
    KitDeLEGO = "Kit de LEGO®",
    Legendaria = "LEGENDARIA",
    LoteDeObjetos = "Lote de objetos",
    Mascota = "Mascota",
    Micrófono = "Micrófono",
    Música = "Música",
    PantallaDeCarga = "Pantalla de carga",
    PerfecciónAReacciónQueJuegaEnSuPropiaLiga = "Perfección a reacción que juega en su propia liga.",
    Pico = "Pico",
    PistaDeImprovisación = "Pista de improvisación",
    PocoComún = "POCO COMÚN",
    Potenciador = "Potenciador",
    Rara = "RARA",
    Rastro = "Rastro",
    Rueda = "Rueda",
    SagaStarWars = "Saga Star Wars",
    SerieCongelada = "Serie congelada",
    SerieDeDc = "SERIE DE DC",
    SerieDeLasSombras = "Serie de las sombras",
    SerieDeMarvel = "SERIE DE MARVEL",
    SerieDeÍdolos = "Serie de ídolos",
    SerieLamborghini = "SERIE LAMBORGHINI",
    SerieLeyendasDeVideojuegos = "Serie Leyendas de videojuegos",
    SerieMclaren = "SERIE MCLAREN",
    SerieOscura = "SERIE OSCURA",
    SeriesDeLava = "Series de lava",
    SeriesSorbete = "Series sorbete",
    Traje = "Traje",
    Épico = "Épico",
}

export interface Juno {
    icon: null | string;
}

export interface Set {
    id: string;
    name: string;
    partOf: string;
}

