import { type Colord }  from 'colord'

export class Color {

  name: string;
  code: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}

export class Palette {

  name: string;
  colors: Color[];
  type: string;
  
  constructor(name: string, colors: Color[], type: string) {
    this.name = name;
    this.colors = colors;
    this.type = type;
  }
}

export interface ColorType {
  name: string;
  code: string;
  obj?: Colord;
  hsl?: any
}

export interface PaletteType {
  name: string;
  colors: ColorType[];
  type: string;  
}