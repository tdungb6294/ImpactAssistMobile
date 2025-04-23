export interface DamageReport {
  damageReport: {
    reportId: number;
    fullName: string;
    estimatedMinPriceWithoutService: string;
    estimatedMaxPriceWithoutService: string;
    estimatedMinPriceWithService: string;
    estimatedMaxPriceWithService: string;
  };
  autoPartsAndServices: AutoPartsAndServices[];
}

export interface AutoPartsAndServices {
  id: number;
  autoPart: string;
  description: string;
  minPrice: string;
  maxPrice: string;
  categoryName: string;
}
