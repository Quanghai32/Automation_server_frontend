import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

@Injectable()
export class ChartService {
    colorIndex: number = 0;
    colorSupply = new Array();
    colorMatter: string[] = ['red', 'orange', 'CornflowerBlue', 'purple', 'gray', 'black', 'pink', 'BlueViolet', 'DarkKhaki', 'cyan',
        'Tomato', 'DarkSeaGreen', 'SlateGray', 'RosyBrown', 'Olive', 'CornflowerBlue', 'Bisque', 'MediumVioletRed', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''];


}