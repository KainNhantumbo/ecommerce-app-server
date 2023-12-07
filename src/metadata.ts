/* eslint-disable */
export default async () => {
    const t = {
        ["./product/entities/product.entity"]: await import("./product/entities/product.entity"),
        ["./order/entities/orderItem.entity"]: await import("./order/entities/orderItem.entity"),
        ["./order/entities/order.entity"]: await import("./order/entities/order.entity"),
        ["./product/entities/color.entity"]: await import("./product/entities/color.entity"),
        ["./product/entities/image.entity"]: await import("./product/entities/image.entity"),
        ["./product/entities/size.entity"]: await import("./product/entities/size.entity"),
        ["./product/entities/category.entity"]: await import("./product/entities/category.entity"),
        ["./product/dto/create-product.dto"]: await import("./product/dto/create-product.dto"),
        ["./user/user.entity"]: await import("./user/user.entity"),
        ["./billboard/entities/billboard.entity"]: await import("./billboard/entities/billboard.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./user/user.entity"), { "User": { id: { required: true, type: () => Number }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./user/dto/update-user.dto"), { "UpdateUserDto": { firstName: { required: true, type: () => String, minLength: 3, maxLength: 64 }, lastName: { required: true, type: () => String, minLength: 3, maxLength: 64 }, role: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 21 } } }], [import("./auth/dto/sign-in.dto"), { "SignInDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./user/dto/create-user.dto"), { "CreateUserDto": { firstName: { required: true, type: () => String, minLength: 3, maxLength: 64 }, lastName: { required: true, type: () => String, minLength: 3, maxLength: 64 }, email: { required: true, type: () => String, maxLength: 64 }, role: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 21 } } }], [import("./product/entities/image.entity"), { "Image": { id: { required: true, type: () => Number }, product: { required: true, type: () => t["./product/entities/product.entity"].Product }, publicId: { required: true, type: () => String }, url: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./product/entities/color.entity"), { "Color": { id: { required: true, type: () => Number }, product: { required: true, type: () => [t["./product/entities/product.entity"].Product] }, name: { required: true, type: () => String }, value: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./product/entities/size.entity"), { "Size": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, value: { required: true, type: () => String }, products: { required: true, type: () => [t["./product/entities/product.entity"].Product] }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./product/entities/category.entity"), { "Category": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, product: { required: true, type: () => t["./product/entities/product.entity"].Product }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./order/entities/order.entity"), { "Order": { id: { required: true, type: () => Number }, orderItems: { required: true, type: () => [t["./order/entities/orderItem.entity"].OrderItem] }, isPaid: { required: true, type: () => Boolean }, phone: { required: true, type: () => String }, adress: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./order/entities/orderItem.entity"), { "OrderItem": { id: { required: true, type: () => Number }, order: { required: true, type: () => t["./order/entities/order.entity"].Order }, product: { required: true, type: () => t["./product/entities/product.entity"].Product }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./product/entities/product.entity"), { "Product": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, price: { required: true, type: () => Number }, isFeatured: { required: true, type: () => Boolean }, isArchived: { required: true, type: () => Boolean }, colors: { required: true, type: () => [t["./product/entities/color.entity"].Color] }, images: { required: true, type: () => [t["./product/entities/image.entity"].Image] }, sizes: { required: true, type: () => [t["./product/entities/size.entity"].Size] }, category: { required: true, type: () => t["./product/entities/category.entity"].Category }, orderItem: { required: true, type: () => t["./order/entities/orderItem.entity"].OrderItem }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./product/dto/create-product.dto"), { "GenericDataDto": { name: { required: true, type: () => String, minLength: 2, maxLength: 8 }, value: { required: true, type: () => String, minLength: 2, maxLength: 8 } }, "CreateProductDto": { name: { required: true, type: () => String, minLength: 3, maxLength: 21 }, price: { required: true, type: () => Number }, isFeatured: { required: true, type: () => Boolean }, isArchived: { required: true, type: () => Boolean }, colors: { required: true, type: () => [t["./product/dto/create-product.dto"].GenericDataDto] }, images: { required: true, type: () => [String] }, sizes: { required: true, type: () => [t["./product/dto/create-product.dto"].GenericDataDto] }, category: { required: true, type: () => t["./product/dto/create-product.dto"].GenericDataDto } } }], [import("./product/dto/update-product.dto"), { "UpdateProductDto": { name: { required: false, type: () => String, minLength: 3, maxLength: 21 }, price: { required: false, type: () => Number }, isFeatured: { required: false, type: () => Boolean }, isArchived: { required: false, type: () => Boolean }, colors: { required: false, type: () => [t["./product/dto/create-product.dto"].GenericDataDto] }, sizes: { required: false, type: () => [t["./product/dto/create-product.dto"].GenericDataDto] }, category: { required: false, type: () => t["./product/dto/create-product.dto"].GenericDataDto } } }], [import("./billboard/dto/create-billboard.dto"), { "CreateBillboardDto": { label: { required: true, type: () => String, minLength: 2, maxLength: 21 }, image: { required: true, type: () => String } } }], [import("./billboard/dto/update-billboard.dto"), { "UpdateBillboardDto": { label: { required: false, type: () => String, minLength: 2, maxLength: 21 }, image: { required: false, type: () => String } } }], [import("./billboard/entities/billboard.entity"), { "Billboard": { id: { required: true, type: () => Number }, label: { required: true, type: () => String }, image: { required: true, type: () => t["./product/entities/image.entity"].Image }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./order/dto/create-order.dto"), { "CreateOrderDto": { items: { required: true, type: () => [Number] }, isPaid: { required: true, type: () => Boolean }, phone: { required: true, type: () => String }, adress: { required: true, type: () => String } } }]], "controllers": [[import("./user/user.controller"), { "UserController": { "findAll": { type: [t["./user/user.entity"].User] }, "findOneById": { type: t["./user/user.entity"].User }, "updateOne": {}, "deleteOne": {} } }], [import("./auth/auth.controller"), { "AuthController": { "signIn": {}, "signUp": { type: t["./user/user.entity"].User }, "revalidateToken": {}, "signOut": {} } }], [import("./health/health.controller"), { "HealthController": { "getSatus": {} } }], [import("./product/product.controller"), { "ProductController": { "create": { type: t["./product/entities/product.entity"].Product }, "findAll": { type: [t["./product/entities/product.entity"].Product] }, "findOne": { type: t["./product/entities/product.entity"].Product }, "update": {}, "remove": {} } }], [import("./billboard/billboard.controller"), { "BillboardController": { "create": { type: t["./billboard/entities/billboard.entity"].Billboard }, "findAll": { type: [t["./billboard/entities/billboard.entity"].Billboard] }, "findOne": { type: t["./billboard/entities/billboard.entity"].Billboard }, "update": { type: t["./billboard/entities/billboard.entity"].Billboard }, "remove": {} } }], [import("./order/order.controller"), { "OrderController": { "create": { type: t["./order/entities/order.entity"].Order }, "findAll": { type: [t["./order/entities/order.entity"].Order] }, "remove": {} } }]] } };
};