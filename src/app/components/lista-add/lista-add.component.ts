import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';


@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.component.html',
  styleUrls: ['./lista-add.component.css']
})
export class ListaAddComponent implements OnInit {
  tarea: any ={
    nombre: '',
    descripcion: ''
  }

  constructor(private tareaService: TareasService) { }

  ngOnInit() {
  }

  agregar(){
    this.tareaService.addTarea(this.tarea);
    this.tarea.nombre = '';
    this.tarea.descripcion = '';
  }
}
