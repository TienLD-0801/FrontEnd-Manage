import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import HeaderTable from '@/components/admin/atoms/HeaderTable/HeaderTable';
import { COL_USERS } from '@/shared/types/TableType/table-user';
import { UserItem, UserType } from '@/shared/types/api-type/login';
import { DeleteForeverOutlined, EditOutlined } from '@mui/icons-material';
import Button from '@/components/atoms/Button/Button';
import { format } from 'date-fns';
import { DATE_FORMAT, getNewDate } from '@/shared/constants/date';
import { useTranslation } from 'react-i18next';
import './UsersWrapper.scss';
import PaginationCustom from '@/components/atoms/PaginationCustom/PaginationCustom';

interface UsersWrapperProps {
  dataUsers: UserType;
  onClickEdit: (user: UserItem) => void;
  onClickDelete: (user: UserItem) => void;
  onClickCreate: () => void;
  handlePageChange: (event: any, page: number) => void;
}

const UsersWrapper = ({
  dataUsers,
  onClickDelete,
  onClickEdit,
  onClickCreate,
  handlePageChange,
}: UsersWrapperProps) => {
  const { t } = useTranslation();

  return (
    <div className="user-wrapper">
      <div className="user-wrapper__container">
        <div className="user-wrapper__container__title">
          {t('table.user.title')}
        </div>
        <Button
          classes="user-wrapper__container__button"
          onClick={onClickCreate}
        >
          {t('table.user.buttonCreate')}
        </Button>
      </div>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 2,
          border: 'none',
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader sx={{ m: 0 }}>
            <HeaderTable columns={COL_USERS} i18nIsDynamicList={true} />
            <TableBody>
              {dataUsers.items.map((user, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {COL_USERS.map((column) => {
                      const value = user[column.id!];
                      const dateOfBirth = format(
                        getNewDate(user.date_of_birth),
                        DATE_FORMAT,
                      );

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="table"
                        >
                          {column.id === 'action' ? (
                            <div className="user-wrapper__action">
                              <div
                                className="user-wrapper__action__edit"
                                onClick={() => onClickEdit(user)}
                              >
                                <EditOutlined />
                              </div>
                              <div
                                className="user-wrapper__action__delete"
                                onClick={() => onClickDelete(user)}
                              >
                                <DeleteForeverOutlined />
                              </div>
                            </div>
                          ) : column.id === 'id' ? (
                            index + 1
                          ) : column.id === 'role' ? (
                            <div className="user-wrapper__action__label">
                              {user.role === 0 ? 'Admin' : 'Staff'}
                            </div>
                          ) : column.id === 'date_of_birth' ? (
                            dateOfBirth
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PaginationCustom
        className="user-wrapper__pagination"
        count={dataUsers.meta.totalPages}
        page={dataUsers.meta.currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default UsersWrapper;
