import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import './UsersWrapper.scss';
import React from 'react';
import HeaderTable from '@/components/admin/atoms/HeaderTable/HeaderTable';
import { COL_USERS } from '@/type/TableType/table_type';
import { UserType } from '@/api_type/Login/login';
import { DeleteForeverOutlined, EditOutlined } from '@mui/icons-material';
import Button from '@/components/atoms/Button/Button';
import { format } from 'date-fns';
import { DATE_FORMAT, getNewDate } from '@/constants/date';

interface UsersWrapperProps {
  dataUsers: UserType[];
  onClickEdit: (user: UserType) => void;
  onClickDelete: (user: UserType) => void;
  onClickCreate: () => void;
}

const UsersWrapper = ({
  dataUsers,
  onClickDelete,
  onClickEdit,
  onClickCreate,
}: UsersWrapperProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="user-wrapper">
      <div className="user-wrapper__container">
        <div className="user-wrapper__container__title">User Table</div>
        <Button
          classes="user-wrapper__container__button"
          onClick={onClickCreate}
        >
          Create User
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
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader sx={{ m: 0 }}>
            <HeaderTable columns={COL_USERS} />
            <TableBody>
              {dataUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.id.toString()}
                    >
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default UsersWrapper;
