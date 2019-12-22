import { Component, OnInit, TemplateRef } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../interfaces/tarea';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  tareas: any;
  tar: Tarea={};
  modalRef: BsModalRef;

  constructor(private tareasService: TareasService,
              private modalService: BsModalService) {
    this.tareasService.listaTarea().subscribe(tarea=>{
      this.tareas = tarea;
    })
   }

  ngOnInit() {
    
  }

   mostrarModal(template: TemplateRef<any>, tarea) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.tar = tarea;
  }
  eliminar(){
    this.tareasService.eliminarTarea(this.tar);
    this.modalRef.hide();
    console.log('se presiono aceptar en modal eliminar');
  }

  cancelar(){
    this.modalRef.hide();
  }

  editarModal(template: TemplateRef<any>,tarea){
    this.modalRef = this.modalService.show(template);
    this.tar = tarea
    
    
  }

  editar(){
    console.log("presionando guardar", this.tar);
    this.tareasService.editarTarea(this.tar);
    this.modalRef.hide();
  }

}
