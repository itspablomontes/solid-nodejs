import { User } from "@prisma/client";
import { IUsersRepository } from "../interfaces/user.repository.interface";
import { ResourceNotFoundError } from "../errors/resource.not.found";

interface GetUserProfileServiceRequest {
  id: string;
}

interface GetUserProfileServiceResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    id,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
