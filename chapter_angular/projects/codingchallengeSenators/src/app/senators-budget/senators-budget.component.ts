import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget, SenatorBudget, SenatorsService } from '../senators.service';

@Component({
  selector: 'app-senators-budget',
  templateUrl: './senators-budget.component.html',
  styleUrls: ['./senators-budget.component.css'],
})
export class SenatorsBudgetComponent implements OnInit {
  constructor(
    private senatorsService: SenatorsService,
    private route: ActivatedRoute
  ) {}
  senatorsBudget: SenatorBudget;
  id: number;
  totalBudget: number;
  eachBudget: number[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = parseInt(paramMap.get('id'));

      this.senatorsService
        .retrieveSenatorBudget(this.id)
        .subscribe((senatorBudget) => {
          this.senatorsBudget = senatorBudget;
          this.sumBudget();
          this.sumEachBudget();
        });
    });
  }

  sumBudget() {
    this.totalBudget = this.senatorsBudget.despesas.reduce((acc, curr) => {
      return acc + curr.valor;
    }, 0);
  }

  sumEachBudget() {
    for (let index = 1; index < 8; index++) {
      this.eachBudget.push(
        this.senatorsBudget.despesas
          .filter((budget) => budget.tipo === index)
          .reduce((acc, curr) => acc + curr.valor, 0)
      );
    }
  }

  typeBudget(type: number) {
    switch (type) {
      case 1:
        return 'Aluguel de imóveis e despesas concernentes a eles.';
      case 2:
        return 'Divulgação da atividade parlamentar.';
      case 3:
        return 'Aquisição de material de consumo para uso no escritório.';
      case 4:
        return 'Passagens aéreas, aquáticas e terrestres nacionais.';
      case 5:
        return 'Contratação de consultorias, assessorias, pesquisas, trabalhos técnicos e outros serviços.';
      case 6:
        return 'Locomoção, hospedagem, alimentação e combustíveis.';
      case 7:
        return 'Serviços de Segurança Privada.';
    }
  }

  formatData(budget: Budget) {
    return `${budget.dia}/${budget.mes}/${budget.ano}`;
  }
}
