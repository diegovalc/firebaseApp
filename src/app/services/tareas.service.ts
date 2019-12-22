import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private itemsCollection: AngularFirestoreCollection<Tarea>;
  private itemDoc: AngularFirestoreDocument<Tarea>;

  tareas: Observable<Tarea[]>;



  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Tarea>('tareas');
    this.tareas = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tarea;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listaTarea(){
    return this.tareas;
  }
  addTarea(tarea: Tarea) {
    this.itemsCollection.add(tarea);
  }

  eliminarTarea(tarea: Tarea){
    this.itemDoc = this.afs.doc<Tarea>(`tareas/${tarea.id}`);
    this.itemDoc.delete();
  }

  editarTarea(tarea: Tarea){
    this.itemDoc = this.afs.doc<Tarea>(`tareas/${tarea.id}`);
    this.itemDoc.update(tarea);
  }
}
