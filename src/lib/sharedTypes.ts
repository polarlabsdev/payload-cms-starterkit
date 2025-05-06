import { Metadata } from 'next';

export type NextPageProps<T> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type NextMetadataFunc<T> = (args: NextPageProps<T>) => Promise<Metadata>;

export type RequestWithCookies = {
  cookies: {
    get: (name: string) => {
      value: string;
    };
  };
} & Request;

export type NextRouteFunc = (req: RequestWithCookies) => Promise<Response>;
