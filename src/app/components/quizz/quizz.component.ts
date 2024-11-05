import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import quizz_data from '../../../assets/data/quizz_data.json';
@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css',
})
export class QuizzComponent {
  title: string = 'Quizz X';

  questions: any;
  questionSelected: any;

  answers: string[] = [];

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  end: boolean = false;
  answerSelected:string = ''

  ngOnInit(): void {
    if (quizz_data) {
      this.end = false;
      this.title = quizz_data.title;

      this.questionIndex = 0;
      this.questionMaxIndex = quizz_data.questions.length - 1;

      this.questions = quizz_data.questions;
      this.questionSelected = this.questions[this.questionIndex];

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  optionSelected(option: string) {
    this.answers.push(option);
    this.incrementIndex();
  }

  async incrementIndex() {
    this.questionIndex++;
    if (this.questionIndex > this.questionMaxIndex) {
      this.end = true;
      const result:string = await this.brewResults(this.answers)
      this.answerSelected = quizz_data.results[result as keyof typeof quizz_data.results]
    } else {
      this.questionSelected = this.questions[this.questionIndex]
    }
  }

  async brewResults(answers: string[]) {
    let aCounter = 0;
    let bCounter = 0;

    for (const answer of answers) {
      if (answer === 'A') {
        aCounter++;
      } else if (answer === 'B') {
        bCounter++;
      }
    }

    return aCounter > bCounter ? 'A' : 'B';
  }
}
