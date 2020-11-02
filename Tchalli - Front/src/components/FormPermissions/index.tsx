import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Checkbox from '../Checkbox';
import Select from '../Select';
import Form from '../FormModal';

import { useModal } from '../../hooks/modal';
// import { Container } from './styles';

interface IModule {
  id: string;
  name: string;
}
interface IRole {
  id: string;
  name: string;
}
interface IPermission {
  id: string;
  role_id: string;
  module_id: string;
  get: boolean;
  post: boolean;
  put: boolean;
  delete: boolean;
  module: IModule;
  role: IRole;
}
interface Props {
  permition?: IPermission;
}
const FormPermissions: React.FC<Props> = ({ permition }) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const history = useHistory();
  const { closeModal } = useModal();

  const handleSubmit = useCallback(
    async data => {
      if (permition) {
        await api.put<IPermission>(`/permission/${permition.id}`, {
          ...data,
          module_id: data.modules,
          role_id: data.roles,
        });
      } else {
        await api.post<IPermission>('/permission', {
          ...data,
          module_id: data.modules,
          role_id: data.roles,
        });
      }
      history.go(0);
      closeModal();
    },
    [closeModal, history, permition],
  );

  useEffect(() => {
    async function load() {
      const response = await api.get('/roles');
      setRoles(response.data);
      const respModule = await api.get('/modules');
      setModules(respModule.data);
    }
    load();
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <span>roles</span>
      <Select
        name="roles"
        options={roles.map(r => ({
          id: r.id,
          label: r.name,
          value: r.id,
          default: permition && r.id === permition.role_id,
        }))}
      />
      <Select
        name="modules"
        options={modules.map(m => ({
          id: m.id,
          value: m.id,
          label: m.name,
          default: permition && m.id === permition.module_id,
        }))}
      />

      <Checkbox
        name="post"
        label="post"
        value="true"
        defaultChecked={permition?.post}
      />
      <Checkbox
        name="get"
        label="get"
        value="true"
        defaultChecked={permition?.get}
      />
      <Checkbox
        name="put"
        label="put"
        value="true"
        defaultChecked={permition?.put}
      />
      <Checkbox
        name="delete"
        label="delete"
        value="true"
        defaultChecked={permition?.delete}
      />

      <button type="submit">Cadastrar</button>
    </Form>
  );
};

export default FormPermissions;
