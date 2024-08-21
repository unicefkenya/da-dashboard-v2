import { TestBed } from '@angular/core/testing'
import { SchoolService } from './school.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('SchoolService', () => {
  
    beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SchoolService],
    teardown: { destroyAfterEach: false }
}))

    it('should be created', () => {
      const service: SchoolService = TestBed.get(SchoolService)
        expect(service).toBeTruthy()
    })

})
