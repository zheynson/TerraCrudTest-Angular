import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../services/search.service';
import {Todo} from '../models/Todo';

@Component({
  selector: 'app-module-window',
  templateUrl: './module-window.component.html',
  styleUrls: ['./module-window.component.scss']
})
export class ModuleWindowComponent implements OnInit {
  dataForm: FormGroup;
  public type!: 'create' | 'update';

  private man: Todo;


  @Output() close = new EventEmitter<void>();

  constructor(private apiService: SearchService) { }

  ngOnInit(): any {
    this.apiService.searchUser().subscribe(response => {
      this.man = response;
      console.log(this.man);

      this.type = this.apiService.type;
      if (this.type === 'update'){
        this.dataForm.setValue(
          {
            title: this.man.title,
            text: this.man.text,
            image: this.man.image,
          })
      }

    });

    this.dataForm = new FormGroup({
      title: new FormControl('',
        [Validators.minLength(2), Validators.required]),
      text: new FormControl('', [Validators.minLength(3), Validators.required]),
      image: new FormControl('', [Validators.minLength(7), Validators.required])
    });

    // this.type = this.apiService.type;
    // if (this.type === 'update'){
    //   this.dataForm.controls.title.setValue(this.man.title);
    //   this.dataForm.controls.image.setValue(this.man.image);
    //   this.dataForm.controls.text.setValue(this.man.text);
    // }

  }

  submit(): any {
    const formData = {...this.dataForm.value};
    let allFormData = {
      ...formData,
      active: 1,
      url: formData.image,
      sort_order: null,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    };
    if (this.apiService.type === 'create'){
      allFormData.created_at = new Date().toDateString();
      this.apiService.createCard(allFormData).subscribe(res => {
        console.log(allFormData);
        this.apiService.search();

        this.dataForm.reset();
        this.close.emit();
      });

    }else if (this.apiService.type === 'update') {
      allFormData.updated_at = new Date().toDateString();
      this.apiService.editUser(allFormData).subscribe(res => {
        console.log(allFormData);
        this.apiService.search()

        this.dataForm.reset();
        this.close.emit();
      })
    }

  }
}
