"""empty message

Revision ID: 1bcd9fdea58b
Revises: 783a49ce96cb
Create Date: 2021-12-12 19:20:17.418186

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1bcd9fdea58b'
down_revision = '783a49ce96cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('conversations_user_id_two_fkey', 'conversations', type_='foreignkey')
    op.drop_column('conversations', 'user_id_two')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('conversations', sa.Column('user_id_two', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('conversations_user_id_two_fkey', 'conversations', 'users', ['user_id_two'], ['id'])
    # ### end Alembic commands ###
