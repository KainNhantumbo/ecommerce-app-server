/* eslint-disable */
export default async () => {
    const t = {
        ["./user/user.entity"]: await import("./user/user.entity"),
        ["./user/dto/create-user.dto"]: await import("./user/dto/create-user.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./user/dto/create-user.dto"), { "CreateUserDto": { username: { required: true, type: () => String, minLength: 3, maxLength: 64 }, email: { required: true, type: () => String, maxLength: 64 }, password: { required: true, type: () => String, minLength: 8, maxLength: 21 } } }], [import("./user/user.entity"), { "User": { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String } } }], [import("./user/dto/update-user.dto"), { "UpdateUserDto": { username: { required: true, type: () => String, minLength: 3, maxLength: 64 }, password: { required: true, type: () => String, minLength: 8, maxLength: 21 } } }]], "controllers": [[import("./user/user.controller"), { "UserController": { "findOneById": { type: t["./user/user.entity"].User }, "updateOne": {}, "deleteOne": {}, "create": { type: t["./user/dto/create-user.dto"].CreateUserDto } } }]] } };
};