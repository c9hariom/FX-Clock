export interface Market {
  name: string;
  timezone: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface TimeZone {
  label: string;
  value: string;
  offset: number;
}