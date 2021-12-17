import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.staging.headversity.com/api/v2",
});

export const getToken: () => {
  headers: {
    Authorization: string;
  };
} | null = () => {
  try {
    const user = window?.localStorage?.usertoken;
    const parseuser = JSON.parse(user);
    let config = {
      headers: {
        Authorization: `Bearer ${parseuser.token}`,
      },
    };
    return config;
  } catch (err) {
    return null;
  }
};

export const getAllPaths: () => Promise<any> = async () => {
  try {
    const config:
      | {
          headers: {
            Authorization: string;
          };
        }
      | null
      | any = getToken();
    const res: AxiosResponse = await api.get(`/Paths`, config);

    return new Promise((resolve, reject) => {
      return resolve(res.data);
    });
  } catch (err) {
    return new Promise((resolve, reject) => {
      return resolve("Some error Occoured");
    });
  }
};
export const getAllSkills: () => Promise<any> = async () => {
  try {
    const config:
      | {
          headers: {
            Authorization: string;
          };
        }
      | null
      | any = getToken();
    const res: AxiosResponse = await api.get(`/Skills`, config);

    return new Promise((resolve, reject) => {
      return resolve(res.data);
    });
  } catch (err) {
    return new Promise((resolve, reject) => {
      return resolve("Some error Occoured");
    });
  }
};

export const getPathsByPresentationId: (id: any) => Promise<unknown> = async (
  id: any
) => {
  try {
    const config:
      | {
          headers: {
            Authorization: string;
          };
        }
      | null
      | any = getToken();
    const res: AxiosResponse = await api.get(
      `/Paths/${id}/presentations`,
      config
    );

    return new Promise((resolve, reject) => {
      return resolve(res.data);
    });
  } catch (err) {
    return new Promise((resolve, reject) => {
      return resolve("Some error Occoured");
    });
  }
};

export const getPresentationsByData: (config: any) => Promise<unknown> = async (
  config: any
) => {
  try {
    const token = getToken();
    const res: AxiosResponse = await api.get(`/presentations`, {
      ...config,
      ...token,
    });

    return new Promise((resolve, reject) => {
      return resolve(res.data);
    });
  } catch (err) {
    return new Promise((resolve, reject) => {
      return resolve("Some error Occoured");
    });
  }
};
