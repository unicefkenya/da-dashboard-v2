import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    selector: 'base-crud',
    template: '',
    styles: ['']
})
export class BaseCrudComponent implements OnInit {

    id: any;
    instance: any
    providedInstance: any

    constructor(public route: ActivatedRoute, public router: Router) {
        const instance = this.router.getCurrentNavigation()?.extras.state as any;
        if (instance) {
            this.providedInstance = instance
            this.id = instance?.id
        } else {
            this.id = this.route.snapshot.paramMap.get('id')
        }
    }

    ngOnInit(): void {

    }

    setIntance(value: any) {
        this.instance = value
    }


    onValidatedData(data: any) {
        console.log(data)
    }

    async onPostedData(value: any) {
        // this.router.navigate(["schedules"],)
        await window.history.back()
    }

}
