// Model example
import { AutoIncrement, Column, DataType, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript";


@Table({
    modelName: 'Users',
    tableName: 'users',
})
export class Users extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'id' })
    id: number;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    password: string;
}