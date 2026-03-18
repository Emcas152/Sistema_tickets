import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    standalone: false
})
export class SnackbarComponent {
    constructor(public snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }
}
