export interface ISpot {
  title?: string;
  markerId?: string;
  latitude?: number;
  longitude?: number;
}

export interface IStoredSpots {
  spots: Array<ISpot>;
}

export interface IInitialContext extends IStoredSpots {
  center?: {
    lat?: number;
    lng?: number;
  };
  zoom?: number;
}
