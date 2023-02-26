import { FunctionComponent } from "react";


type GroupNamePropsType = {
    stylesField: string;
    groupName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type GroupNameType = FunctionComponent<GroupNamePropsType>;


const GroupName:GroupNameType = ({stylesField, groupName, onChange}) => {


    return (
        <div className={stylesField}>
            <label htmlFor="group-name">Group name</label>
            <input 
                type="text" 
                name="group-name"
                id="group-name" 
                value={groupName}
                onChange={onChange}
                />
        </div>
    );
}

export default GroupName;