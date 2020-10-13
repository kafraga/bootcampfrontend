import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Senator {
  id: number;
  nomeSenador: string;
}

export interface Budget {
  tipo: number;
  fornec: string;
  ano: number;
  mes: number;
  dia: number;
  valor: number;
}

export interface SenatorBudget {
  id: number;
  nomeSenador: string;
  despesas: Budget[];
}

const urlBase = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SenatorsService {
  constructor(private http: HttpClient) {}

  listSenators() {
    return this.http.get<Senator[]>(`${urlBase}/senadores?_sort=name`);
  }

  retrieveSenatorBudget(id: number) {
    return this.http.get<SenatorBudget>(`${urlBase}/despesasSenadores/${id}`);
  }
}
