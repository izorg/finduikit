export const fetchNpmPackageData = async (
  name: string,
): Promise<{
  repository: {
    url: string;
  };
}> => {
  const response = await fetch(`https://registry.npmjs.org/${name}`);

  const json = await response.json();

  return json;
};
