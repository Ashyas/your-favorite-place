import React, {useEffect, useState} from "react";

import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/users-list/UsersList";


const Users = () => {

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const responseData = await sendRequest('http://localhost:5000/api/users');
          setLoadedUsers(responseData.users)
        } catch (error) {}
      }
      fetchUsers();
    }, [sendRequest]);


    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <div className="center">
            <LoadingSpinner />
          </div>}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      </React.Fragment>
    );
};

export default Users;