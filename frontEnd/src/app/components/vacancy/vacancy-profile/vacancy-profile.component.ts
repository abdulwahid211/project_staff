import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vacancy} from 'src/app/models/vacancy';
import {GET_VACANCY_PROFILE} from 'src/app/graphql/graphql.queries';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-vacancy-profile',
  templateUrl: './vacancy-profile.component.html',
  styleUrls: ['./vacancy-profile.component.css'],
})
export class VacancyProfileComponent implements OnInit {
  vacancy!: Vacancy;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apollo
      .watchQuery({
        query: GET_VACANCY_PROFILE,
        variables: {
          vacancyId: id,
        },
      })
      .valueChanges.subscribe(({data, error}: any) => {
        console.log(data);
        this.vacancy = data.Vacancy;
      });
  }

  onBack(): void {
    this.router.navigate(['/vacancyList']);
  }
}
