import { Component, OnInit } from '@angular/core';
import { ICommonMessages } from 'app/shared/model/commonMessages.model';

import { ConfigurationService, PropertySource } from './data-configuration.service';

@Component({
  selector: 'jhi-configuration',
  templateUrl: './data-configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
  allBeans!: any;
  beans: any = [];
  beansFilter = '';
  beansAscending = true;
  propertySources: PropertySource[] = [];
  dataForChange: any = [];

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService
      .getBeans({
        page: 0,
        size: 27,
        sort: ['tipoMensaje,asc']
      })
      .subscribe(beans => {
        // eslint-disable-next-line no-console
        console.log('beasns: ', beans.body);
        this.allBeans = beans.body;
        this.filterAndSortBeans();
        // eslint-disable-next-line no-console
        console.log('beasns2: ', beans.body);
      });
  }

  filterAndSortBeans(): void {
    this.beans = this.allBeans.map((bean: { mensajes: string }) => {
      // eslint-disable-next-line no-console
      console.log('beasns2: ', bean);
      bean.mensajes = JSON.parse(bean.mensajes);
      return bean;
    });
    // .filter(bean => !this.beansFilter || bean.tipoMensaje.toLowerCase().includes(this.beansFilter.toLowerCase()))
    // .sort((a, b) => (a.id < b.id ? (this.beansAscending ? -1 : 1) : this.beansAscending ? 1 : -1));
  }

  save(): void {
    // eslint-disable-next-line no-console
    console.log('beannnnnns: ', this.dataForChange);
    this.dataForChange.forEach((data: ICommonMessages) => {
      const dataToSave = data;
      dataToSave.mensajes = JSON.stringify(data.mensajes);
      // eslint-disable-next-line no-console
      console.log('beannnnnns: ', data);
      this.configurationService.update(dataToSave).subscribe(result => {
        // eslint-disable-next-line no-console
        console.log(result);
      });
      dataToSave.mensajes = JSON.parse(data.mensajes!);
    });
    // eslint-disable-next-line no-console
    console.log('beansend', this.beans);
  }

  onNameChange(bean: any, key: string, text: any): void {
    // eslint-disable-next-line no-console
    console.log('beannnnnns: ', bean);
    bean.mensajes[key] = JSON.parse(text);
    if (this.dataForChange.length > 0) {
      this.dataForChange.map((data: { id: any }, index: string | number) => {
        if (data.id === bean.id) {
          this.dataForChange[index] = bean;
        } else {
          this.dataForChange.push(bean);
        }
      });
    } else {
      this.dataForChange.push(bean);
    }

    // eslint-disable-next-line no-console
    console.log('beannnnnnsn: ', this.dataForChange);
    // eslint-disable-next-line no-console
    console.log('beannnnnnst: ', text);
  }
}
