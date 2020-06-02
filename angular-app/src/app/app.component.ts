import { Component } from '@angular/core';
import { ConsumptionService } from './consumption.service';

const TYPE_ALERT = {
  SUCCESS: 'success',
  DANGER: 'danger',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'angular-app';
  pagination: any;
  message = '';
  showEdit = false;
  type = '';
  consumptionsEditable = null;
  consumptions: any = [];

  constructor(protected consumptionService: ConsumptionService) {
    this.pagination = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.consumptions.length,
    };
  }

  pageChanged(event) {
    this.pagination.currentPage = event;
  }

  onEditable(consumption) {
    this.showEdit = true;
    if (consumption) {
      this.consumptionsEditable = Object.assign({}, consumption);
    }
  }

  onAdd() {
    this.showEdit = true;
    this.consumptionsEditable = {
      id: null,
      date: null,
      consumption: null,
      price: null,
      cost: null,
    };
  }

  onPush() {
    this.consumptionsEditable.date = new Date();

    this.consumptionService
      .insertConsumption(this.consumptionsEditable)
      .subscribe(
        (resp: any) => {
          if (resp.status === 200) {
            this.getAllConsumptions();
            this.showAlert(TYPE_ALERT.SUCCESS, resp.data.id, 'inserted');
            this.onCancel();
          }
        },
        (error) => {
          console.error(error);
          this.showAlert(TYPE_ALERT.DANGER, null, null);
        }
      );
  }

  onCancel() {
    this.showEdit = false;
    this.consumptionsEditable = null;
  }

  onEdit() {
    this.consumptionService
      .updateConsumption(this.consumptionsEditable)
      .subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.getAllConsumptions();
            this.showAlert(
              TYPE_ALERT.SUCCESS,
              this.consumptionsEditable.id,
              'updated'
            );
            this.onCancel();
          }
        },
        (error) => {
          console.error(error);
          this.showAlert(TYPE_ALERT.DANGER, null, null);
        }
      );
  }

  onDelete(id) {
    this.consumptionService.deleteConsumption(id).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.getAllConsumptions();
          this.showAlert(TYPE_ALERT.SUCCESS, id, 'deleted');
        }
      },
      (error) => {
        console.error(error);
        this.showAlert(TYPE_ALERT.DANGER, null, null);
      }
    );
  }

  ngOnInit() {
    this.getAllConsumptions();
  }

  getAllConsumptions() {
    this.consumptionService.getAllConsumptions().subscribe(
      (data: any) => {
        // Success
        this.consumptions = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showAlert(type, id, action) {
    this.message = `The consumption with the ID ${id} has been ${action} successfully`;
    this.type = TYPE_ALERT.SUCCESS;

    if (type === TYPE_ALERT.DANGER) {
      this.message = `Couldn't do the action what you requested, sorry`;
      this.type = TYPE_ALERT.DANGER;
    }

    const that = this;
    setTimeout(function () {
      if (that.message) {
        that.message = '';
        that.type = '';
      }
    }, 5000);
  }
}
