import GeneralTable from "@/components/table/Table"

const UsersPage = () => {
  return <div style={{paddingBottom: "50px"}}>
      <div className="users__row">
        <div className="users__card">
          <GeneralTable/>
        </div>
      </div>
  </div>
};

export default UsersPage;