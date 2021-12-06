import React from "react";
import { User } from "types";

export interface Project {
  id: string;
  name: string;
  personId: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/* undefined.name */}
            <td>
              {users.find((user) => user._id === project.personId)?.username ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
