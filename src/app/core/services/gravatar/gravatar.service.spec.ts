import { TestBed } from '@angular/core/testing';
import * as e from 'express';

import { GravatarService } from './gravatar.service';

describe('GravatarService', () => {
  let service: GravatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#createGravatarUrl should return a string that contains at least one "/" and ends in "?d=retro"', () => {
    const regex = new RegExp('/^https:\/\/gravatar\.com\/avatar\/(\w|\d)*\?d=retro$');
    expect(service.createGravatarUrl('juanma@gmail.com')).toMatch(regex);
    expect(service.createGravatarUrl('juanma')).toMatch(regex);
    expect(service.createGravatarUrl('servi7123e@test.hot234mail')).toMatch(
      regex
    );
    expect(service.createGravatarUrl('')).toMatch('');
  });
});
