import { container } from 'tsyringe';

import IMailProvider from './MailProvider/models/IMailProvider';
import FakeMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
// import './StorageProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(FakeMailProvider),
);
