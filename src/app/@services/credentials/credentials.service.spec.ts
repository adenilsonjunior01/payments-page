import { expect } from '@jest/globals';

import { ECredentialsStorage } from './../../@enums/credentials-storage.enum';
import { IUser } from './../../@shared/models/interfaces/user.interface';
import { CredentialsService } from './credentials.service';

describe('CredentialsService', () => {
  let service: CredentialsService;

  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };

  const mockSessionStorage = {
    clear: jest.fn()
  };

  beforeEach(() => {
    service = new CredentialsService();
    (service as any).local = mockLocalStorage;
    (service as any).session = mockSessionStorage;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store credentials in local storage', () => {
    const user: IUser = {
      id: 1,
      email: 'user@example.com',
      password: 'password',
      name: 'user'
    };

    service.credentials(user);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      ECredentialsStorage.USER,
      JSON.stringify(user)
    );
  });

  it('should get user credentials from local storage', () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ id: 1, name: 'Test User' })
    );
    const user = service.user;
    expect(user).toEqual({ id: 1, name: 'Test User' });
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(ECredentialsStorage.USER);
  });

  it('should clear local and session storage on logout', () => {
    service.logout();
    expect(mockLocalStorage.clear).toHaveBeenCalled();
    expect(mockSessionStorage.clear).toHaveBeenCalled();
  });

  it('should return null if stored value cannot be parsed as valid JSON', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid JSON');
    expect(service.user).toBeNull();
  });
});
