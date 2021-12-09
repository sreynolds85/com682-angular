import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from './delete-confirm.component';

@Injectable()
export class DeleteConfirmService {

  constructor(private ms: NgbModal) { }

  public confirm(modTitle: string, warning: string, confirmBtn: string = 'Delete Profile', cancelDeleteBtn: string = 'Cancel', dialogSize: 'sm'|'lg' = 'sm'): 
  Promise<boolean> { const modalRef = this.ms.open(DeleteConfirmComponent, { size: dialogSize });
    modalRef.componentInstance.modTitle = modTitle;
    modalRef.componentInstance.warning = warning;
    modalRef.componentInstance.confirmBtn = confirmBtn;
    modalRef.componentInstance.cancelDeleteBtn = cancelDeleteBtn;
    return modalRef.result;
  }

}